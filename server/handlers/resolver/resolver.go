package resolver

import (
	"errors"
	"fmt"
	"github.com/scottjr632/go/net/http/helpers"
	"github.com/scottjr632/interesting-url-transformer/reverseproxy"
	"net/http"
)

const reg = `%s/(?P<name>.*\S)`

type Resolver interface {
	Handle(w http.ResponseWriter, r *http.Request)
	Proxy(target string, w http.ResponseWriter, r *http.Request)
}

func New(path string, getter func(string) string) Resolver {
	return &resolver{
		getter:       getter,
		urlArgGetter: helpers.BuildGetParams(fmt.Sprintf(reg, path)),
	}
}

type resolver struct {
	getter       func(string) string
	urlArgGetter func(string) map[string]string
}

func (f *resolver) Proxy(target string, w http.ResponseWriter, r *http.Request) {
	r.URL.Path = ""
	tv := f.getter(target)
	reverseproxy.Serve(tv, w, r)
}

func (f *resolver) Handle(w http.ResponseWriter, r *http.Request) {
	v := f.urlArgGetter(r.URL.Path)
	if v["name"] == "" {
		helpers.WriteError(w, errors.New("Name not provided"), http.StatusBadRequest)
		return
	}

	r.URL.Path = ""
	tv := f.getter(v["name"])
	reverseproxy.Serve(tv, w, r)
}
