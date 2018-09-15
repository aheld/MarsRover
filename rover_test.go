package rover

import "testing"

func TestRover(t *testing.T) {
	cases := []struct {
		in, want string
	}{
		{
			`4 4
1 2 S`, "1 2 S"},
	}
	for _, c := range cases {
		got := Execute(c.in)
		if got != c.want {
			t.Errorf("Execute(%q) == %q, want %q", c.in, got, c.want)
		}
	}
}
