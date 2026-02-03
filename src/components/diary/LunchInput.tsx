import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface LunchInputProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lunchMenu: string;
  onUpdateLunchMenu: (menu: string) => void;
}

export const LunchInput = ({
  open,
  onOpenChange,
  lunchMenu,
  onUpdateLunchMenu,
}: LunchInputProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">🍽️</span>
            Menu du déjeuner
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Qu'est-ce qu'elle a mangé aujourd'hui?"
            value={lunchMenu}
            onChange={(e) => onUpdateLunchMenu(e.target.value)}
            className="rounded-xl resize-none min-h-[100px]"
            rows={3}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button 
            onClick={() => onOpenChange(false)}
            className="rounded-xl px-6"
          >
            Terminé
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
