  <template>
    <div class="admin-audio-player">
      <audio-player
        :sources="formattedAudioUrl"
        :admin="true"
        :audioInfo="{
          book: {
            title: rowData.title,
            id: rowData.id,
          },
          type: type,
          audioId: null,
        }">
      </audio-player>
    </div>
  </template>

  <script>
  import AudioPlayer from '@/components/AudioPlayer';
  import Urls from '@/assets/urls';

  export default {
    components: {
      'audio-player': AudioPlayer,
    },
    props: {
      rowData: {
        type: Object,
        required: true,
      },
      type: String,
    },
    data() {
      return {
        audioUrl: Urls.audio,
      };
    },
    computed: {
      formattedAudioUrl() {
        let url;
        if (this.type === 'description') {
          url = this.rowData.descriptionAudioUrl;
        } else {
          url = this.rowData.reviewAudioUrl;
        }
        return [this.audioUrl + url];
      },
    },
    created() {
    },
  };
  </script>

