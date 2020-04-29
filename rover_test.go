package rover

import (
	"strings"
	"testing"
)

func TestRover(t *testing.T) {
	cases := []struct {
		in, want, message string
	}{
		{"500 500\n1 2 S", "1 2 S", "No moves, simple case"},
		{"500 500\n1 2 N\nR", "1 2 E", "Right turn, simple case"},
		{"500 500\n1 2 N\nL", "1 2 W", "Left turn, simple case"},
		{"500 500\n1 2 N\nLL", "1 2 S", "Left turn, simple case"},
		{"500 500\n1 2 N\nLLL", "1 2 E", "Left turn, simple case"},
		{"500 500\n1 2 N\nLLLL", "1 2 N", "Left turn, simple case"},
	}
	for _, c := range cases {
		got := Execute(c.in)
		if got != c.want {
			t.Errorf("\n%s\nExecute(%q) == %q, want %q", c.message, c.in, got, c.want)
		}
	}
}

func TestPropertyRover(t *testing.T) {
	cases := []struct {
		start, moves, end, message string
	}{
		{"1 2 N", "L", "1 2 W", "Left turn, simple case"},
		{"1 2 N", "LL", "1 2 S", "Left turn, simple case"},
		{"1 2 N", "LLL", "1 2 E", "Left turn, simple case"},
		{"1 2 N", "LLLL", "1 2 N", "Left turn, simple case"},
	}
	for _, c := range cases {
		input := ("100 100\n" + c.start + "\n" + c.moves)
		forward := Execute(input)

		reveseMoves := strings.ReplaceAll(c.moves, "L", "R")

		newInput := "100 100\n" + forward + "\n" + reveseMoves
		reverse := Execute(newInput)

		if c.start != reverse {
			t.Errorf("\n%s\nExecute(%q) [%q]== Execite(%q) [%q]", c.message, input, forward, newInput, reverse)
		}

	}
}
