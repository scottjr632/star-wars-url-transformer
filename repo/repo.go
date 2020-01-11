package repo

import redis "github.com/go-redis/redis/v7"

import "log"

type Repo interface {
	Find(string) string
	Set(key, value string) error
}

type repo struct {
	client *redis.Client
	c      *Config
}

func NewFromDefault() (Repo, error) {
	return New(&Config{})
}

func New(c *Config) (Repo, error) {
	applyDefaults(c)
	client := redis.NewClient(&redis.Options{
		Addr:     c.Address,
		Password: c.Password, // no password set
		DB:       c.DB,       // use default DB
	})

	if pong, err := client.Ping().Result(); err != nil {
		return nil, err
	} else {
		log.Println(pong, "CONNECTED TO REDIS")
	}

	return &repo{client, c}, nil
}

func (r *repo) Find(value string) string {
	v, _ := r.client.Get(value).Result()
	return v
}

func (r *repo) Set(key, value string) error {
	return r.client.SetNX(key, value, r.c.Expiration).Err()
}
