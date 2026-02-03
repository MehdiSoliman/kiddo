import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PeriodConfig, PeriodEntry, ACTIVITIES, CustomActivity } from '@/types/diary';
import { cn } from '@/lib/utils';
import { X, Plus, Check, Pencil } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmojiPicker } from './EmojiPicker';

interface ActivityPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: PeriodConfig;
  entry: PeriodEntry;
  onToggleActivity: (activityId: string) => void;
  onAddCustomActivity: (emoji: string, text: string) => void;
  onUpdateCustomActivity: (customActivityId: string, emoji: string, text: string) => void;
  onRemoveCustomActivity: (customActivityId: string) => void;
}

interface CustomActivityFormProps {
  initialEmoji?: string;
  initialText?: string;
  onSave: (emoji: string, text: string) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const CustomActivityForm = ({ 
  initialEmoji = '⭐', 
  initialText = '', 
  onSave, 
  onCancel,
  isEditing = false 
}: CustomActivityFormProps) => {
  const [emoji, setEmoji] = useState(initialEmoji);
  const [text, setText] = useState(initialText);

  const handleSave = () => {
    if (text.trim()) {
      onSave(emoji, text.trim());
    }
  };

  return (
    <div className="space-y-2 p-3 bg-muted/50 rounded-xl">
      <EmojiPicker selectedEmoji={emoji} onSelect={setEmoji} />
      
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Décris l'activité..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="rounded-xl flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
        />
        <Button 
          onClick={handleSave}
          disabled={!text.trim()}
          size="sm"
          className="rounded-xl"
        >
          <Check className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-muted-foreground"
        >
          Annuler
        </Button>
      </div>
    </div>
  );
};

export const ActivityPicker = ({
  open,
  onOpenChange,
  config,
  entry,
  onToggleActivity,
  onAddCustomActivity,
  onUpdateCustomActivity,
  onRemoveCustomActivity,
}: ActivityPickerProps) => {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<CustomActivity | null>(null);

  const handleAddCustom = (emoji: string, text: string) => {
    onAddCustomActivity(emoji, text);
    setShowCustomForm(false);
  };

  const handleUpdateCustom = (emoji: string, text: string) => {
    if (editingActivity) {
      onUpdateCustomActivity(editingActivity.id, emoji, text);
      setEditingActivity(null);
    }
  };

  const handleStartEdit = (activity: CustomActivity) => {
    setEditingActivity(activity);
    setShowCustomForm(false);
  };

  const handleClose = (openState: boolean) => {
    if (!openState) {
      setShowCustomForm(false);
      setEditingActivity(null);
    }
    onOpenChange(openState);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden rounded-2xl flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            📚 {config.labelFr}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {/* Add custom activity button - ALWAYS VISIBLE AT TOP */}
            {!showCustomForm && !editingActivity && (
              <Button
                variant="outline"
                onClick={() => setShowCustomForm(true)}
                className="w-full rounded-xl border-dashed border-2 py-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                Ajouter une activité personnalisée
              </Button>
            )}

            {/* Add custom activity form */}
            {showCustomForm && (
              <CustomActivityForm
                onSave={handleAddCustom}
                onCancel={() => setShowCustomForm(false)}
              />
            )}

            {/* Custom activities */}
            {entry.customActivities.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Mes activités personnalisées
                </label>
                <div className="flex flex-wrap gap-2">
                  {entry.customActivities.map((ca) => (
                    editingActivity?.id === ca.id ? (
                      <div key={ca.id} className="w-full">
                        <CustomActivityForm
                          initialEmoji={ca.emoji}
                          initialText={ca.text}
                          onSave={handleUpdateCustom}
                          onCancel={() => setEditingActivity(null)}
                          isEditing
                        />
                      </div>
                    ) : (
                      <div
                        key={ca.id}
                        className="flex items-center gap-2 bg-accent/50 rounded-full px-3 py-1.5 group"
                      >
                        <button
                          onClick={() => handleStartEdit(ca)}
                          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                        >
                          <span>{ca.emoji}</span>
                          <span className="text-sm">{ca.text}</span>
                          <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button
                          onClick={() => onRemoveCustomActivity(ca.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Activity grid */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Activités prédéfinies
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {ACTIVITIES.map((activity) => {
                  const isSelected = entry.activities.includes(activity.id);
                  return (
                    <button
                      key={activity.id}
                      onClick={() => onToggleActivity(activity.id)}
                      className={cn(
                        'flex flex-col items-center gap-1 p-3 rounded-xl transition-all relative',
                        'hover:scale-105 active:scale-95',
                        isSelected 
                          ? 'bg-primary/20 ring-2 ring-primary shadow-sm' 
                          : 'bg-muted hover:bg-muted/80'
                      )}
                    >
                      <span className="text-2xl">{activity.emoji}</span>
                      <span className="text-xs font-medium text-center leading-tight">
                        {activity.labelFr}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary absolute top-1 right-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-2 border-t">
          <Button 
            onClick={() => handleClose(false)}
            className="rounded-xl px-6"
          >
            Terminé
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
