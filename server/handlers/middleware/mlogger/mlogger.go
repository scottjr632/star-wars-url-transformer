package mlogger

import (
	"log"
	"net/http"
	"time"
)

// Logger is a middleware that logs stuff
func New(nextHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		nextHandler.ServeHTTP(w, r)

		log.Printf("(%s) \"%s %s %s\" %d", r.RemoteAddr, r.Method, r.RequestURI, r.Proto, time.Since(start))
	})
}
