package namesfilter

import (
	"bufio"
	"hash"
	"hash/fnv"
	"log"
	"os"
)

const (
	defaultHashNum   = 2
	defaultFileName  = "names.txt"
	firstNamesFile   = "firstnames.txt"
	lastNamesFile    = "lastnames.txt"
	defaultSeperator = "-"
)

var defaultHashFn = fnv.New64a()

type Config struct {
	HashFn     hash.Hash64
	NumHashFns int

	FileName string

	FirstNames string
	LastNames  string

	DefaultSeperator string
}

func applyDefaultValues(c *Config) {
	if c.NumHashFns == 0 {
		c.NumHashFns = defaultHashNum
	}
	if c.HashFn == nil {
		c.HashFn = defaultHashFn
	}
	if c.FileName == "" {
		c.FileName = defaultFileName
	}
	if c.FirstNames == "" {
		c.FirstNames = firstNamesFile
	}
	if c.LastNames == "" {
		c.LastNames = lastNamesFile
	}
	if c.DefaultSeperator == "" {
		c.DefaultSeperator = defaultSeperator
	}
}

type NamesFilter interface {
	GetValue(string) string
}

func NewFromDefault() NamesFilter {
	return New(&Config{})
}

func New(c *Config) NamesFilter {
	applyDefaultValues(c)
	nf := &namesFilter{hashFn: c.HashFn}
	nf.populateFirstNamesFilter(c.FirstNames)
	nf.populateLastNamesFilter(c.LastNames)
	log.Println(c.FirstNames)
	nf.m = int64(len(nf.firstNames))
	nf.k = c.NumHashFns
	nf.seperator = c.DefaultSeperator
	return nf
}

type namesFilter struct {
	k int
	m int64

	filter [][]rune

	firstNames [][]rune
	lastNames  [][]rune

	seperator string

	hashFn hash.Hash64
}

func (n *namesFilter) GetValue(value string) string {
	var s []string
	indexes := n.getHashIndexes(value)
	for _, idx := range indexes {
		if (idx+1)%2 != 0 {
			s = append(s, string(n.firstNames[idx]))
		} else {
			s = append(s, string(n.lastNames[idx]))
		}
	}

	var rv string
	for i, v := range s {
		rv += v
		if i+1 < len(s) {
			rv += n.seperator
		}
	}
	return rv
}

func (n *namesFilter) populateFirstNamesFilter(fileName string) {
	file, err := os.Open(fileName)
	defer file.Close()
	if err != nil {
		log.Fatal(err)
	}

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		n.firstNames = append(n.firstNames, []rune(scanner.Text()))
	}
}

func (n *namesFilter) populateLastNamesFilter(fileName string) {
	file, err := os.Open(fileName)
	defer file.Close()
	if err != nil {
		log.Fatal(err)
	}

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		n.lastNames = append(n.lastNames, []rune(scanner.Text()))
	}
}

func (n *namesFilter) populateNamesFilter(fileName string) {
	file, err := os.Open(fileName)
	defer file.Close()
	if err != nil {
		log.Fatal(err)
	}

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		n.filter = append(n.filter, []rune(scanner.Text()))
	}

}

func hashValue(value string, k int64, hashFn hash.Hash64) (uint32, uint32) {
	hashFn.Reset()
	hashFn.Write([]byte(value))
	h64 := hashFn.Sum64()
	h1 := uint32(h64 & ((1 << 32) - 1))
	h2 := uint32(h64 >> 32)
	return h1, h2
}

func (n *namesFilter) getHashIndexes(value string) []uint32 {
	var indexes []uint32
	h1, h2 := hashValue(value, n.m, defaultHashFn)
	for i := 0; i < n.k; i++ {
		idx := (h1 + uint32(i)*h2) % uint32(n.m)
		indexes = append(indexes, idx)
	}
	return indexes
}
