package main

import (
	"log"
	"os"
	"strconv"

	"github.com/scottjr632/interesting-url-transformer/namesfilter"
	"github.com/scottjr632/interesting-url-transformer/repo"
	"github.com/scottjr632/interesting-url-transformer/server"
	"github.com/scottjr632/interesting-url-transformer/urltransformer"
)

func main() {
	dbAddr := os.Getenv("DB_ADDR")

	rcfg := &repo.Config{
		Address: dbAddr,
	}
	repo, err := repo.New(rcfg)
	if err != nil {
		log.Fatal(err)
	}

	utlCfg := &urltransformer.Config{
		T:    namesfilter.NewFromDefault(),
		Repo: repo,
	}

	ult := urltransformer.New(utlCfg)

	sPort := os.Getenv("SERVER_PORT")
	if sPort == "" {
		sPort = "0"
	}

	sPortInt, err := strconv.Atoi(sPort)
	if err != nil {
		log.Fatal(err)
	}

	s := server.New(&server.Config{Port: sPortInt}, ult)
	log.Fatal(s.Run())
}
