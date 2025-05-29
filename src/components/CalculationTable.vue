<script setup lang="ts">
import { computed, ref } from 'vue';
import { Payer, type IPurchase } from './interfaces/IPurchase';
import TableRow from './TableRow.vue';
import { v4 as uuidv4 } from 'uuid';

const newEntry = (count: number) => {
    for (let i = 0; i < count; i++) {
        purchases.value.push({
            id: uuidv4(),
            description: '',
            amount: "",
            date: new Date(),
            pau: false,
            crista: false,
            ken: false,
            julius: false,
            paidBy: Payer.Crista
        })
    }
}

const purchases = ref<IPurchase[]>([]);

newEntry(1);

const perPersonCosts = computed(() => {
    return purchases.value.map(p => {
        const usersCount = [p.pau, p.crista, p.ken, p.julius].filter(item => item).length

        if (usersCount === 0) {
            return 0;
        }

        return evenRound(Number(p.amount) / usersCount, 4);
    })
})

const totalAmount = computed(() => {
    return purchases.value.map(p => Number(p.amount)).reduce((acc, curr) => acc + curr, 0);
})

const totalOwedByPerson = computed(() => {
    let result : Record<Payer, number> = {
        [Payer.Crista] : 0,
        [Payer.Julius] : 0,
        [Payer.Ken] : 0,
        [Payer.Pau] : 0
    };

    for (let [index, p] of purchases.value.entries()) {
        if (p.crista) {
            result[Payer.Crista] += perPersonCosts.value[index]
        }

        if (p.julius) {
            result[Payer.Julius] += perPersonCosts.value[index]
        }

        if (p.ken) {
            result[Payer.Ken] += perPersonCosts.value[index]
        }

        if (p.pau) {
            result[Payer.Pau] += perPersonCosts.value[index]
        }
    }

    return result;
})

const totalCostPaidByPerson = computed(() => {
    let result : Record<Payer, number> = {
        [Payer.Crista] : 0,
        [Payer.Julius] : 0,
        [Payer.Ken] : 0,
        [Payer.Pau] : 0
    };

    for (let [_, p] of purchases.value.entries()) {
        result[p.paidBy] += Number(p.amount)
    }

    return result;
})

const evenRound = (num: number, decimalPlaces: number) => {
    var d = decimalPlaces || 0;
    var m = Math.pow(10, d);
    var n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
    var i = Math.floor(n), f = n - i;
    var e = 1e-8; // Allow for rounding errors in f
    var r = (f > 0.5 - e && f < 0.5 + e) ?
        ((i % 2 == 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
}

const deleteRow = (purchase: IPurchase) => {
    const index = purchases.value.findIndex(p => p.id === purchase.id)

    if (index >= 0) {
        purchases.value.splice(index, 1);
    }
}

const updateDescription = (purchase: IPurchase, newDescription: string) => {
    purchase.description = newDescription
}

const updateAmount = (purchase: IPurchase, newAmount: string) => {
    purchase.amount = newAmount
}

const updatePau = (purchase: IPurchase, newAmount: boolean) => {
    purchase.pau = newAmount
}

const updateCrista = (purchase: IPurchase, newAmount: boolean) => {
    purchase.crista = newAmount
}

const updateJulius = (purchase: IPurchase, newAmount: boolean) => {
    purchase.julius = newAmount
}

const updateKen = (purchase: IPurchase, newAmount: boolean) => {
    purchase.ken = newAmount
}

const updatePaidBy = (purchase: IPurchase, newAmount: Payer) => {
    purchase.paidBy = newAmount
}

</script>

<template>
    <div class="calculation-table">
        <table>
            <tr>
                <th>No</th>
                <th>Description</th>
                <th>Amount ($)</th>
                <th>Date</th>
                <th>Pau</th>
                <th>Crista</th>
                <th>Ken</th>
                <th>Julius</th>
                <th>Paid By</th>
                <th>Per Person Cost</th>
                <th></th>
            </tr>
            <TableRow v-for="(purchase, index) in purchases" :key="purchase.id" v-bind="purchase" :number="index + 1"
                :per-person-cost="perPersonCosts[index]" @update-description="(e) => updateDescription(purchase, e)"
                @update-amount="(e) => updateAmount(purchase, e)" @update-pau="(e) => updatePau(purchase, e)"
                @update-crista="(e) => updateCrista(purchase, e)" @update-julius="(e) => updateJulius(purchase, e)"
                @update-ken="(e) => updateKen(purchase, e)" @update-paid-by="(e) => updatePaidBy(purchase, e)"
                @delete="deleteRow(purchase)"></TableRow>
            <tr>
                <td></td>
                <td>Total Cost Paid</td>
                <td>{{ totalAmount }}</td>
                <td></td>
                <td>{{ evenRound(totalCostPaidByPerson[Payer.Pau], 2) }}</td>
                <td>{{ evenRound(totalCostPaidByPerson[Payer.Crista], 2) }}</td>
                <td>{{ evenRound(totalCostPaidByPerson[Payer.Ken], 2) }}</td>
                <td>{{ evenRound(totalCostPaidByPerson[Payer.Julius], 2) }}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td>Total Cost Owed</td>
                <td>{{ totalAmount }}</td>
                <td></td>
                <td>{{ evenRound(totalOwedByPerson[Payer.Pau], 2) }}</td>
                <td>{{ evenRound(totalOwedByPerson[Payer.Crista], 2) }}</td>
                <td>{{ evenRound(totalOwedByPerson[Payer.Ken], 2) }}</td>
                <td>{{ evenRound(totalOwedByPerson[Payer.Julius], 2) }}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td>Difference Owed/Owes</td>
                <td></td>
                <td></td>
                <td>{{ evenRound(totalCostPaidByPerson[Payer.Pau] - totalOwedByPerson[Payer.Pau], 2) }}</td>
                <td>{{ evenRound(totalCostPaidByPerson[Payer.Crista] - totalOwedByPerson[Payer.Crista], 2) }}</td>
                <td>{{ evenRound(totalCostPaidByPerson[Payer.Ken] - totalOwedByPerson[Payer.Ken], 2) }}</td>
                <td>{{ evenRound(totalCostPaidByPerson[Payer.Julius] - totalOwedByPerson[Payer.Julius], 2) }}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
        <button @click="newEntry(1)">Add More</button>
        <button @click="newEntry(5)">Add 5 More</button>
        <button @click="newEntry(10)">Add 10 More</button>
    </div>
</template>

<style scoped>
table,
th,
td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 8px;
}

.calculation-table {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

button {
    padding: 24px 24px;
    font-size: 18px;
}
</style>