<!--
	KanbanColumn.vue
	Created by Colin on 10/30/24.
-->

<template>
	<div
		class="kanban-column"
		@dragenter.prevent="onDragEnter"
		@dragover.prevent
		@dragleave.prevent="onDragLeave"
		@drop.prevent.stop="drop($event, columnIndex)"
	>
		<div>
			<h3 style="color: azure;">{{ status }}</h3>
		</div>
		<ul style="padding-left: 0rem; margin-bottom: 0rem;">
			<li
				v-for="(card, cardIndex) in cards"
				:key="card.id"
				style="list-style-type: none; margin-bottom: .25rem;"
			>
				<KanbanCard
					:card="card"
					:card-index="cardIndex"
					:column-index="columnIndex"
					:from-card-index="fromCardIndexState ? fromCardIndexState : Infinity"
					:drag-over-card-index="dragOverCardIndex"
					:hovering="cardIndex == dragOverCardIndex"
					draggable="true"
					@dragstart="dragStart($event, cardIndex)"
					@dragover.prevent="onDragOver($event, cardIndex)"
					@drop.prevent.stop="drop($event, columnIndex, cardIndex)"
					@click="$emit('cardClicked', columnIndex, cardIndex, card)"
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
				</KanbanCard>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import KanbanCard from './KanbanCard.vue';

	// Props
	const props = defineProps({
		status: String,
		cards: Array,
		columnIndex: Number
	});

	// Emits
	const emit = defineEmits(['moveCard', 'cardClicked']);

	// State for managing drag and drop
	const dragOverCardIndex = ref(null);
	const fromCardIndexState = ref(null);

	// Methods
	const dragStart = (event, cardIndex) => { 
		event.dataTransfer.effectAllowed = 'move'
		event.dataTransfer.dropEffect = 'move'
		event.dataTransfer.setData('from-column-index', props.columnIndex);
		event.dataTransfer.setData('from-card-index', cardIndex);
		fromCardIndexState.value = cardIndex;
	};

	const drop = (event, toColumnIndex, toCardIndex) => {
		const fromColumnIndex = event.dataTransfer.getData('from-column-index')
		const fromCardIndex = event.dataTransfer.getData('from-card-index')
		emit('moveCard', fromCardIndex, toCardIndex, fromColumnIndex, toColumnIndex);

		// Reset the dragOverCardIndex after drop
		dragOverCardIndex.value = null;
		fromCardIndexState.value = null;
	};

	const onDragEnter = () => {
		dragOverCardIndex.value = 0;
	};

	const onDragLeave = () => {
		dragOverCardIndex.value = null;
	};

	const onDragOver = (event, cardIndex) => { 
		dragOverCardIndex.value = cardIndex;
	};
</script>

<style scoped>
	.kanban-column {
		overflow-y: auto;
    background-color: #2f2f2f;
    box-shadow: 2rem;
    border-radius: 1rem;
    padding: 1rem;
    margin-left: .35rem;
    margin-right: .35rem;
    flex: 1 1 0%;
    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
	}
</style>
