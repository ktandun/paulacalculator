<script setup lang="ts">
import { Payer, type IPurchase, type IPurchaseTableRowProps } from './interfaces/IPurchase';

const props = defineProps<IPurchaseTableRowProps>();
const emit = defineEmits<{
    (e: 'updateDescription', value: string): void
    (e: 'updateAmount', value: string): void
    (e: 'updatePau', value: boolean): void
    (e: 'updateCrista', value: boolean): void
    (e: 'updateJulius', value: boolean): void
    (e: 'updateKen', value: boolean): void
    (e: 'updatePaidBy', value: Payer): void
    (e: 'delete'): void
}>()

const updateDescription = (event: any) => {
    const newValue = event.target.value;
    emit('updateDescription', newValue)
}

const updateAmount = (event: any) => {
    const newValue = event.target.value;
    emit('updateAmount', newValue)
}

const updatePau = (event: any) => {
    const newValue = event.target.checked;
    emit('updatePau', newValue)
}

const updateCrista = (event: any) => {
    const newValue = event.target.checked;
    emit('updateCrista', newValue)
}

const updateJulius = (event: any) => {
    const newValue = event.target.checked;
    emit('updateJulius', newValue)
}

const updateKen = (event: any) => {
    const newValue = event.target.checked;
    emit('updateKen', newValue)
}

const updatePaidBy = (event: any) => {
    const newValue = event.target.value;
    emit('updatePaidBy', newValue)
}

const deleteClicked = () => {
    emit('delete');
}
</script>

<template>
    <tr>
        <td>{{ props.number }}</td>
        <td><input :value="props.description" @input="updateDescription"></td>
        <td><input type="number" :value="props.amount" @input="updateAmount"></td>
        <td><input type="date" v-model="props.date"></td>
        <td> <input type="checkbox" :checked="props.pau" @change="updatePau" /> </td>
        <td> <input type="checkbox" v-model="props.crista" @input="updateCrista" /> </td>
        <td> <input type="checkbox" v-model="props.ken" @input="updateKen" /> </td>
        <td> <input type="checkbox" v-model="props.julius" @input="updateJulius" /> </td>
        <td>
            <select :value="props.paidBy" @change="updatePaidBy">
                <option :value="Payer.Crista">Crista</option>
                <option :value="Payer.Julius">Julius</option>
                <option :value="Payer.Ken">Ken</option>
                <option :value="Payer.Pau">Pau</option>
            </select>
        </td>
        <td>{{  props.perPersonCost }}</td>
        <td><button @click="deleteClicked">❌️</button></td>
    </tr>
</template>

<style lang="css" scoped>
td {
    padding: 8px;
}
</style>