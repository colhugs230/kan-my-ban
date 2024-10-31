import { ref } from 'vue'
import { action } from '@storybook/addon-actions';
import KanMyBan from './KanMyBan.vue';

export default {
  title: 'KanMyBan',
  component: KanMyBan,
};

const Template = (args) => ({
  components: { KanMyBan },
  setup() {
    let dataModel = ref([
      {status: 'Status 1', tasks: [{id: 1, title: "Card 1", data: 'A long time ago'}]},
      {status: 'Status 2', tasks: [{id: 2, title: "Card 2", data: 'In a galaxy'}]},
      {status: 'Status 3', tasks: [{id: 3, title: "Card 3", data: 'not so far'}, {id: 4, title: "Card 4", data: 'away'}]},
      {status: 'Status 4', tasks: [{id: 5, title: "Card 5", data: 'lived an oger in a swamp'}]},
    ])
    return { args, dataModel };
  },
  template: `
    <KanMyBan v-bind="args" v-model="dataModel" @cardClicked="onCardClicked">
      <template #cardBody="{ cardData }">
        <p>{{ cardData.data }}</p>
      </template>
    </KanMyBan>
  `,
  methods: {
    onCardClicked: action('cardClicked'),
  }
});

export const Default = Template.bind({});
Default.args = {
  // Define default args (props) here
};
