import type { IScreenshot } from '@interfaces';

const _modalOpen = ref(false);
const _selectedImage = ref<IScreenshot | null>(null);

export function useImageModal() {
  function openModal(item: IScreenshot) {
    _selectedImage.value = item;
    _modalOpen.value = true;
  }

  return {
    modalOpen: _modalOpen,
    selectedImage: _selectedImage,
    openModal,
  };
}
