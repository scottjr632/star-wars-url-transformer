package server

import (
	"fmt"
	"github.com/scottjr632/interesting-url-transformer/server/handlers"
	"github.com/scottjr632/interesting-url-transformer/server/handlers/apihandler"
	"log"
	"net/http"
)

// Server ...
type Server interface {
	Run() error
}

type server struct {
	*Config
}

func (s *server) Run() error {
	port := fmt.Sprintf(":%v", s.Port)
	log.Printf("Server running on port :%v", port)
	return http.ListenAndServe(port, nil)
}

// New ...
func New(c *Config, d apihandler.APIHandlerDependencies) Server {
	s := &server{c}
	applyDefault(c)
	h := handlers.New(c.Domain, d)

	if err := h.RegisterAll(); err != nil {
		log.Fatalln(err)
	}

	return s
}
