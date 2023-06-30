package main

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
