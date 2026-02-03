import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TimeSlotConfig, TimeSlotEntry, ACTIVITIES } from '@/types/diary';
import { cn } from '@/lib/utils';
import { X, Plus, Check } from 'lucide-react';

interface ActivityPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: TimeSlotConfig;
  entry: TimeSlotEntry;
  onToggleActivity: (activityId: string) => void;
  onAddCustomActivity: (emoji: string, text: string) => void;
  onRemoveCustomActivity: (customActivityId: string) => void;
  onUpdateLunchMenu?: (menu: string) => void;
}

const CUSTOM_EMOJIS = ['⭐', '❤️', '🌟', '✨', '🎁', '🎯', '🌈', '🦋', '🐶', '🐱', '🎪', '🎭'];

export const ActivityPicker = ({
  open,
  onOpenChange,
  config,
  entry,
  onToggleActivity,
  onAddCustomActivity,
  onRemoveCustomActivity,
  onUpdateLunchMenu,
}: ActivityPickerProps) => {
  const [customText, setCustomText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('⭐');
  const [showCustomForm, setShowCustomForm] = useState(false);

  const handleAddCustom = () => {
    if (customText.trim()) {
      onAddCustomActivity(selectedEmoji, customText.trim());
      setCustomText('');
      setShowCustomForm(false);
    }
  };

  const isLunch = config.id === 'lunch';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">{config.emoji}</span>
            {config.labelFr}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Lunch menu input */}
          {isLunch && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                🍽️ Menu du déjeuner
              </label>
              <Textarea
                placeholder="Qu'est-ce qu'elle a mangé aujourd'hui?"
                value={entry.lunchMenu || ''}
                onChange={(e) => onUpdateLunchMenu?.(e.target.value)}
                className="rounded-xl resize-none"
                rows={2}
              />
            </div>
          )}

          {/* Activity grid */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Activités
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {ACTIVITIES.map((activity) => {
                const isSelected = entry.activities.includes(activity.id);
                return (
                  <button
                    key={activity.id}
                    onClick={() => onToggleActivity(activity.id)}
                    className={cn(
                      'flex flex-col items-center gap-1 p-3 rounded-xl transition-all',
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

          {/* Custom activities */}
          {entry.customActivities.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Activités personnalisées
              </label>
              <div className="flex flex-wrap gap-2">
                {entry.customActivities.map((ca) => (
                  <div
                    key={ca.id}
                    className="flex items-center gap-2 bg-accent/50 rounded-full px-3 py-1.5"
                  >
                    <span>{ca.emoji}</span>
                    <span className="text-sm">{ca.text}</span>
                    <button
                      onClick={() => onRemoveCustomActivity(ca.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add custom activity form */}
          {showCustomForm ? (
            <div className="space-y-3 p-4 bg-muted/50 rounded-xl">
              <div className="flex flex-wrap gap-2">
                {CUSTOM_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={cn(
                      'text-2xl p-2 rounded-lg transition-all',
                      selectedEmoji === emoji 
                        ? 'bg-primary/20 ring-2 ring-primary' 
                        : 'hover:bg-muted'
                    )}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Décris l'activité..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="rounded-xl"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
                />
                <Button 
                  onClick={handleAddCustom}
                  disabled={!customText.trim()}
                  className="rounded-xl"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomForm(false)}
                className="text-muted-foreground"
              >
                Annuler
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowCustomForm(true)}
              className="w-full rounded-xl border-dashed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une activité personnalisée
            </Button>
          )}
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