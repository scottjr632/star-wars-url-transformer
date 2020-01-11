package namesfilter

import "testing"

func TestCanCreate(t *testing.T) {
	nf := NewFromDefault()
	t.Error(nf.GetValue("192.168.1.101"))
}
