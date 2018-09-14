package rover

import "testing"

func TestRover(t *testing.T) {
	cases := []struct {
		in, want string
	}{
		{
			`4 4
1 2 S`, "1 2 S"},
		{"4 4\n1 2 S\nM", "1 1 S"},
		{"4 4\n1 2 S\nR", "1 2 W"},
		{"4 4\n1 1 S\nR", "1 1 W"},
		{"4 4\n1 1 S\nL", "1 1 E"},
		{"4 4\n1 1 N\nL", "1 1 W"},
		{"4 4\n1 1 N\nM", "1 2 N"},
		{"4 4\n1 1 E\nM", "2 1 E"},
		{"4 4\n1 2 S\nMM", "1 0 S"},
		{"4 4\n1 2 S\nRM", "0 2 W"},
		{"4 4\n1 1 S\nRM", "0 1 W"},
		{"4 4\n1 1 S\nLM", "2 1 E"},
		{"4 4\n1 1 N\nLM", "0 1 W"},
		{"4 4\n1 1 N\nMM", "1 3 N"},
		{"4 4\n1 1 E\nMM", "3 1 E"},
		{"4 4\n1 1 E\nMM\n1 1 N\nLM", "3 1 E\n0 1 W"},
	}
	for _, c := range cases {
		got := Execute(c.in)
		if got != c.want {
			t.Errorf("Execute(%q) == %q, want %q", c.in, got, c.want)
		}
	}
}
