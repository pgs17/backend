package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func getInput(prompt string, r *bufio.Reader) (string, error) {
	fmt.Print(prompt)
	input, err := r.ReadString('\n')
	return strings.TrimSpace(input), err
}

// bill creation
func Create_bill() bill {
	reader := bufio.NewReader(os.Stdin)
	// os.stdin is the source

	// fmt.Println("Create a new bill with name:")
	// // name, _ := reader.ReadString('\n')
	// // name = strings.TrimSpace(name)

	name, _ := getInput("Create a new bill name: ", reader)
	Bill := new_bill(name)
	fmt.Println("Created the bill ", Bill.name)
	return Bill
}

func promptOptions(b bill) {
	reader := bufio.NewReader(os.Stdin)

	opt, _ := getInput("Choose option (a -add item, s - save bill, t - add tip): ", reader)
	fmt.Println(opt)

	switch opt {
	case "a":
		name, _ := getInput("Item name: ", reader)
		price, _ := getInput("Item price: ", reader)

		// price input is string so convert or parse into float 64
		p, err := strconv.ParseFloat(price, 64)
		if err != nil {
			fmt.Println("Price must be a number")
			promptOptions(b)
		}
		b.add_items(name, p)

		fmt.Println("item added -", name, price)
		promptOptions(b)

		fmt.Println(name, price)
	case "t":
		tip, _ := getInput("Enter tip amount ($): ", reader)

		t, err := strconv.ParseFloat(tip, 64)
		if err != nil {
			fmt.Println("Tip must be a number")
			promptOptions(b)
		}

		b.update_tip(t)

		fmt.Println("tip has been updated to", tip)
		promptOptions(b)
	case "s":
		b.save()
		fmt.Println("you chose to save the bill", b.name)
	default:
		fmt.Println("That was not a valid option...")
		promptOptions(b)
	}
}

func main() {
	my_bill := Create_bill()
	promptOptions(my_bill)
}
