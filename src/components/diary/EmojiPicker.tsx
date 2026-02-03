import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EMOJI_CATEGORIES, searchEmojis } from '@/lib/emojiData';

interface EmojiPickerProps {
  selectedEmoji: string;
  onSelect: (emoji: string) => void;
}

export const EmojiPicker = ({ selectedEmoji, onSelect }: EmojiPickerProps) => {
  const [activeCategory, setActiveCategory] = useState(EMOJI_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    return searchEmojis(searchQuery);
  }, [searchQuery]);

  const showSearch = searchQuery.trim().length > 0;

  return (
    <div className="space-y-2">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un emoji..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 rounded-xl h-9 text-sm"
        />
      </div>

      {showSearch ? (
        // Search results
        <div className="h-[80px] overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {searchResults.map((item) => (
                <button
                  key={item.emoji}
                  onClick={() => {
                    onSelect(item.emoji);
                    setSearchQuery('');
                  }}
                  className={cn(
                    'text-xl p-1.5 rounded-lg transition-all',
                    selectedEmoji === item.emoji
                      ? 'bg-primary/20 ring-2 ring-primary'
                      : 'hover:bg-muted'
                  )}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-2">
              Aucun emoji trouvé
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Category tabs */}
          <div className="overflow-x-auto">
            <div className="flex gap-1 pb-1">
              {EMOJI_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-all flex-shrink-0',
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Emoji grid for active category */}
          <div className="h-[80px] overflow-y-auto">
            <div className="flex flex-wrap gap-1">
              {EMOJI_CATEGORIES.find(c => c.id === activeCategory)?.emojis.map((item) => (
                <button
                  key={item.emoji}
                  onClick={() => onSelect(item.emoji)}
                  className={cn(
                    'text-xl p-1.5 rounded-lg transition-all',
                    selectedEmoji === item.emoji
                      ? 'bg-primary/20 ring-2 ring-primary'
                      : 'hover:bg-muted'
                  )}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
