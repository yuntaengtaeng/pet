import Dialog from '../components/ui/Dialog';
import useOverlay from './overlay/useOverlay';

interface DialogContents {
  title?: string;
  content?: string;
}

const useConfirmDeletion = () => {
  const overlay = useOverlay();

  const openDialog = (
    { title, content }: DialogContents,
    onRemoveHandler: () => void
  ) => {
    overlay.open(
      <Dialog isOpened={true}>
        {title && <Dialog.Title title={title} />}
        {content && <Dialog.Content content={content} />}
        <Dialog.Buttons
          buttons={[
            {
              label: '삭제',
              onPressHandler: () => {
                overlay.close();
                onRemoveHandler();
              },
            },
            {
              label: '취소',
              onPressHandler: () => {
                overlay.close();
              },
            },
          ]}
        />
      </Dialog>
    );
  };

  return openDialog;
};

export default useConfirmDeletion;
