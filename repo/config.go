package repo

import "time"

const (
	defaultAddress = "localhost:6379"
	defaultDB      = 0
)

var defaultExpiration = 30 * 24 * time.Hour

type Config struct {
	Address    string
	Password   string
	DB         int
	Expiration time.Duration
}

func applyDefaults(c *Config) {
	if c.Address == "" {
		c.Address = defaultAddress
	}
	if c.Expiration == 0 {
		c.Expiration = defaultExpiration
	}
}
