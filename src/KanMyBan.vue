<!--
	KanMyBan.vue
	Created by Colin on 10/30/24.
-->

<template>
	<div class="kanban-board-container">
		<div class="kanban-columns">
			<KanbanColumn
				v-for="(column, columnIndex) in data"
				:key="column.status"
				:status="column.status"
				:cards="column.tasks"
				:column-index="columnIndex"
				@move-card="moveCard"
				@card-clicked="onCardClicked"
			>
				<template #cardHeader="slotProps">
					<slot
						v-bind="slotProps" 
						name="cardHeader"
					/>
				</template>
				<template #cardBody="slotProps">
					<slot
						v-bind="slotProps"
						name="cardBody"
					/>
				</template>
			</KanbanColumn>
		</div>
	</div>
</template>

<script setup>
	// Imports
	import KanbanColumn from './KanbanColumn.vue';

	// Refs
	const data = defineModel()

	// Emits
	const emit = defineEmits(['cardClicked']);

	// Methods
	const moveCard = (fromCardIndex, toCardIndex, fromColumnIndex, toColumnIndex) => {
		const card = data.value[fromColumnIndex].tasks.splice(fromCardIndex, 1)[0]
		if (typeof toCardIndex !== 'undefined')
			data.value[toColumnIndex].tasks.splice(toCardIndex, 0, card)
		else
			data.value[toColumnIndex].tasks.push(card)
	};

	const onCardClicked = (columnIndex, cardIndex, card) => { emit('cardClicked', columnIndex, cardIndex, card) }
</script>

<style scoped>
	.kanban-board-container {
		/* Ensures the wrapper takes the full width and height of the viewport */
		width: 100%;
		height: 100%;
		overflow-x: auto;
		overflow-y: auto;
	}

	.kanban-columns {
		display: flex;
		justify-content: space-around;
		padding-bottom: 4rem;
		flex-grow: 1;
		height: 100%;
	}
</style>
