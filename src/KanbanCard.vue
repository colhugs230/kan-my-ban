<!--
	KanbanCard.vue
	Created by Colin on 10/30/24.
-->

<template>
	<div>
		<div
			v-if="hovering && (fromCardIndex > dragOverCardIndex)"
      style="margin-top: 0.5rem; margin-bottom: 0.5rem;"
		>
      <div class="divider" />
		</div>

		<div class="kanban-card">
			<div>
				<slot
					name="cardHeader"
					:card-data="card"
				>
					<h4>{{ card.title }}</h4>
				</slot>
			</div>
			<div>
				<slot
					name="cardBody"
					:card-data="card"
				/>
			</div>
		</div>

		<div
			v-if="hovering && (fromCardIndex <= dragOverCardIndex)"
      style="margin-top: 0.5rem; margin-bottom: 0.5rem;"
		>
			<div class="divider" />
		</div>
	</div>
</template>

<script setup>
	// Props
	const props = defineProps({
		card: Object,
		cardIndex: Number,
		columnIndex: Number,
		fromCardIndex: {type: Number, default: 0},
		dragOverCardIndex: Number,
		hovering: Boolean
	});

	// Emits
	const emit = defineEmits(['dropCard']);
</script>

<style scoped>
	.kanban-card {
    background-color: #9f9f9f;
    box-shadow: .5rem;
    border-radius: .5rem;
    padding: 1rem;
    margin-left: .25rem;
    margin-right: .25rem;
    cursor: grab;
    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
	}

  .divider {
    border-top: 1px solid #ccc;
    margin: 20px 0;
  }
</style>
