package reverseproxy

import (
	"crypto/tls"
	"net/http"
	"net/http/httputil"
	"net/url"
)

// Serve ...
func Serve(target string, w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, target, http.StatusSeeOther)
}

func serveReverseProxy(target string, w http.ResponseWriter, r *http.Request) {
	url, _ := url.Parse(target)
	proxy := httputil.NewSingleHostReverseProxy(url)
	proxy.Transport = &http.Transport{TLSClientConfig: &tls.Config{
		InsecureSkipVerify: true,
	}}
	r.URL.Host = url.Host
	r.URL.Scheme = url.Scheme
	r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))
	r.Host = url.Host

	proxy.ServeHTTP(w, r)
}
