package handlers

import (
	"fmt"
	"net/http"

	"github.com/scottjr632/interesting-url-transformer/server/handlers/apihandler"
	"github.com/scottjr632/interesting-url-transformer/server/handlers/middleware"
	"github.com/scottjr632/interesting-url-transformer/server/handlers/resolver"
)

const (
	apiPath       = "/api"
	forwarderPath = "/resolver"
)

type Handlers interface {
	RegisterAll() error
}

func New(domain string, d apihandler.APIHandlerDependencies) Handlers {
	h := &handlers{}

	h.api = apihandler.New(apiPath, d)
	h.f = resolver.New(forwarderPath, d.Get)

	return h
}

type handlers struct {
	api apihandler.APIHandler
	f   resolver.Resolver

	domain string
}

func (h *handlers) rootHandler(w http.ResponseWriter, r *http.Request) {
	urlt := r.Context().Value(middleware.SubdomainKey).(string)
	switch true {
	case urlt != "":
		h.f.Proxy(urlt, w, r)
	default:
		http.FileServer(http.Dir("./public")).ServeHTTP(w, r)
	}
}

func (h *handlers) RegisterAll() error {
	re := fmt.Sprintf(`^(\S{3}-\S{3}-\S{3})\.%s`, h.domain)

	http.Handle("/", middleware.Standard.Then(middleware.MakeSubdomainFetcherHandler(re, h.rootHandler)))

	http.Handle(apiPath+"/", middleware.Standard.ThenHandle(h.api.Handle))
	http.Handle(forwarderPath+"/", middleware.Standard.Then(middleware.MakeSubdomainFetcherHandler(re, h.f.Handle)))

	return nil
}
