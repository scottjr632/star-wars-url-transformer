package urltransformer

type Repo interface {
	Find(string) string
	Set(key, value string) error
}

type Transformer interface {
	GetValue(string) string
}
