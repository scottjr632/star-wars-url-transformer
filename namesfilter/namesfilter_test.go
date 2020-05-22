package namesfilter

import "testing"

func TestCanCreate(t *testing.T) {
	nf := NewFromDefault()
	t.Error(nf.GetValue("http://172.18.75.191:3000/"))
}
