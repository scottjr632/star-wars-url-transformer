package urltransformer

import "regexp"

var re = regexp.MustCompile(`(?m)\/$`)

type URLTransformer interface {
	Get(string) string
	Transform(string) string
	TransformAndSet(string) (string, error)
}

func New(c *Config) URLTransformer {
	t := &urlTransformer{c}
	return t
}

type urlTransformer struct {
	*Config
}

func (t *urlTransformer) Get(value string) string {
	return t.Repo.Find(value)
}

func (t *urlTransformer) Transform(value string) string {
	return t.T.GetValue(value)
}

func (t *urlTransformer) TransformAndSet(value string) (string, error) {
	tv := t.Transform(value)
	if !re.MatchString(value) {
		value += "/"
	}

	if err := t.Repo.Set(tv, value); err != nil {
		return "", err
	}
	return tv, nil
}
