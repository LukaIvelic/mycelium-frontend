import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog/dialog';
import type { ProjectDeleteDialogProps } from './projects-view.types';

export function ProjectDeleteDialog({
  open,
  onOpenChange,
  projectName,
  onClose,
  onDelete,
  isDeleting,
}: ProjectDeleteDialogProps) {
  const deleteLabel = isDeleting ? 'Deleting...' : 'Delete';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete project?</DialogTitle>
          <DialogDescription>
            This will permanently delete {projectName}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mx-0 mb-0 border-0 bg-transparent p-0 pt-2'>
          <Button
            className='bg-primary text-primary-foreground hover:bg-primary/90'
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            className='bg-destructive text-white hover:bg-destructive/90'
            disabled={isDeleting}
            onClick={onDelete}
          >
            {deleteLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
