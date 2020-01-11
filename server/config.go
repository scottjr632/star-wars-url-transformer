package server

// Config ...
type Config struct {
	Port   int
	Domain string
}

func applyDefault(c *Config) {
	if c.Port == 0 {
		c.Port = 8888
	}
	if c.Domain == "" {
		c.Domain = "localhost"
	}
}
