package main

import (
	"fmt"
	"os"
)

// model bill with name items tip
type bill struct {
	name  string
	items map[string]float64
	tip   float64
}

// generate a new bill with name

func new_bill(name string) bill {
	bill1 := bill{
		name:  name,
		items: map[string]float64{},
		tip:   0.0,
	}
	return bill1
}

// returns formatted bill
func (b *bill) format() string {
	formatted_bill := "Bill Breakdown \n"
	var total_bill float64 = 0

	// items show
	for index, value := range b.items {
		formatted_bill += fmt.Sprintf("%-25v ...$%v\n", index+":", value)
		total_bill += value
	}

	formatted_bill += fmt.Sprintf("%-25v ...$%v\n", "tip:", b.tip)

	formatted_bill += fmt.Sprintf("%-25v ...$%0.2f", "total:", total_bill)

	return formatted_bill
}

// update tip
func (b *bill) update_tip(tip float64) {
	b.tip = tip
}

// add items to our list
func (b *bill) add_items(name string, price float64) {
	b.items[name] = price
}

// save the bill

func (b *bill) save() {

	// store data in byte slice
	data := []byte(b.format())
	err := os.WriteFile("bills/"+b.name+".txt", data, 0644)

	if err != nil {
		panic(err)
	}
	fmt.Println("Bill was Saved")

}
