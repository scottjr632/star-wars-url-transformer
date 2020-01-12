package middleware

import (
	"context"
	"log"
	"net/http"
	"regexp"
	"strings"

	"github.com/scottjr632/interesting-url-transformer/server/handlers/middleware/alice"
	"github.com/scottjr632/interesting-url-transformer/server/handlers/middleware/mlogger"
	"github.com/scottjr632/interesting-url-transformer/server/handlers/middleware/recover"
)

type key string

var SubdomainKey key = "subdomain"

// Standard is a chain of standard middlewars
var Standard = alice.NewMiddlewareChain(recover.New, mlogger.New)

func MakeSubdomainFetcher(regexStr string, next http.Handler) http.Handler {
	re := regexp.MustCompile(regexStr)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		subdomain := re.FindString(r.Host)
		if strings.Contains(subdomain, ".") {
			subdomain = strings.Replace(subdomain, ".", "", 1)
		}
		ctx := context.WithValue(r.Context(), SubdomainKey, subdomain)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func MakeSubdomainFetcherHandler(regexStr string, next http.HandlerFunc) http.Handler {
	re := regexp.MustCompile(regexStr)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("Host", r.Host)
		subdomain := re.FindString(r.Host)
		log.Println("SUB", subdomain)
		if strings.Contains(subdomain, ".") {
			subdomain = strings.Replace(subdomain, ".", "", 1)
		}
		ctx := context.WithValue(r.Context(), SubdomainKey, subdomain)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
