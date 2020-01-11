package apihandler

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/scottjr632/go/net/http/helpers"
)

const apiURLRegex = `%s/(?P<name>.*\S)`

type APIHandler interface {
	Handle(w http.ResponseWriter, r *http.Request)
}

func New(path string, d APIHandlerDependencies) APIHandler {
	return &handler{
		urlArgGetter:           helpers.BuildGetParams(fmt.Sprintf(apiURLRegex, path)),
		APIHandlerDependencies: d,
	}
}

type APIHandlerDependencies interface {
	Get(string) string
	TransformAndSet(string) (string, error)
}

type handler struct {
	urlArgGetter func(string) map[string]string

	APIHandlerDependencies
}

func (h *handler) Handle(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		h.handleGetAPI(w, r)
	case http.MethodPost:
		h.handlePostAPI(w, r)
	default:
		helpers.WriteError(w, errors.New("INVALID METHOD"), http.StatusMethodNotAllowed)
	}
}

func (h *handler) handleGetAPI(w http.ResponseWriter, r *http.Request) {
	v := h.urlArgGetter(r.URL.Path)
	if v["name"] == "" {
		http.Error(w, "Name not provided", http.StatusBadRequest)
		return
	}

	tv := h.Get(v["name"])
	helpers.WriteJSON(w, struct {
		URL string `json:"url"`
	}{tv})
}

func (h *handler) handlePostAPI(w http.ResponseWriter, r *http.Request) {
	reqJSON := &struct {
		URL string `json:"url"`
	}{}
	if err := helpers.ReadJSON(r, reqJSON); err != nil {
		helpers.WriteError(w, err, http.StatusBadRequest)
		return
	}

	if tURL, err := h.TransformAndSet(reqJSON.URL); err != nil {
		helpers.WriteError(w, err, http.StatusInternalServerError)
	} else {
		reqJSON.URL = tURL
		helpers.WriteJSON(w, reqJSON)
	}
}
