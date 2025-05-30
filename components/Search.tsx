'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Gamepad2, Search as SearchIconLucide, X as XIcon } from 'lucide-react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

interface SearchProps {
  onSearch?: (query: string) => void;
}

// Common types for search components
type InputRef = React.RefObject<HTMLInputElement | null>;

interface InputProps {
  inputRef: InputRef;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear: (e: React.MouseEvent) => void;
}

// Shared input field component used in both active and inactive states
const SearchInputField = ({
  inputRef,
  value,
  onChange,
  onFocus,
  onKeyDown,
  onClear,
  isActive,
}: InputProps & { isActive: boolean }) => {
  return (
    <div className="relative flex-grow flex items-center h-10 bg-zinc-700 rounded-md border border-transparent hover:border-zinc-500 transition-colors duration-200">
      <SearchIconLucide className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400 group-hover:text-zinc-300 pointer-events-none z-10" />
      <CommandInput
        ref={inputRef}
        value={value}
        onValueChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder="Search"
        hideDefaultIcon={true}
        wrapperClassName={`${isActive ? 'w-full' : ''} border-0 p-0 h-full w-full`}
        className={`${isActive ? '' : 'cursor-pointer'} h-full bg-transparent text-zinc-100 placeholder:text-zinc-400 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-9 pr-9 text-sm outline-none rounded-md`}
      />
      {value && (
        <XIcon
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400 cursor-pointer hover:text-zinc-200 z-10"
          onClick={onClear}
        />
      )}
    </div>
  );
};

// Trigger view (inactive state)
const SearchTrigger = ({
  inputRef,
  value,
  onChange,
  onFocus,
  onKeyDown,
  onClear,
  onActivate,
}: InputProps & { onActivate: () => void }) => {
  return (
    <Command
      shouldFilter={false}
      className="overflow-visible cursor-pointer"
      onClick={onActivate}
    >
      <div className="flex items-center space-x-2">
        <SearchInputField
          inputRef={inputRef}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onClear={onClear}
          isActive={false}
        />
        <Link href="/explore">
          <Button>
            <Gamepad2 />
            <p>Explore</p>
          </Button>
        </Link>
      </div>
    </Command>
  );
};

// Suggestion item types
type SuggestionItem = {
  text: string;
  tag?: string;
};

// Hard coded suggestions
const RECENT_ITEMS: SuggestionItem[] = [{ text: 'Roblox', tag: 'Global' }];
const TRENDING_ITEMS: SuggestionItem[] = [
  { text: 'Fortnite' },
  { text: 'Call of Duty: Warzone Mobile' },
  { text: 'Remnant 2' },
];

// Render a suggestion item
const SuggestionItem = ({
  item,
  onSelect,
}: {
  item: SuggestionItem;
  onSelect: (value: string) => void;
}) => {
  return (
    <CommandItem
      className="hover:bg-zinc-700 transition-colors duration-200 cursor-pointer"
      onSelect={() => onSelect(item.text)}
    >
      {item.text}
      {item.tag && (
        <span className="ml-2 px-1.5 py-0.5 text-xs bg-zinc-600 text-zinc-300 rounded-sm">
          {item.tag}
        </span>
      )}
    </CommandItem>
  );
};

// Suggestions dropdown component
const SearchSuggestions = ({
  inputValue,
  onSelectSuggestion,
}: {
  inputValue: string;
  onSelectSuggestion: (value: string) => void;
}) => {
  return (
    <div className="absolute top-full left-0 right-0 mt-1.5 z-50">
      <div className="bg-zinc-800 rounded-md shadow-lg max-h-[calc(100vh-10rem)] overflow-y-auto">
        <CommandList>
          <CommandEmpty>
            {inputValue.trim() ? 'No results found.' : 'Type to search...'}
          </CommandEmpty>

          <CommandGroup
            heading={
              <div className="flex justify-between items-center">
                <span>Recent</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Clear recent clicked');
                  }}
                  className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded"
                >
                  Clear all
                </button>
              </div>
            }
          >
            {RECENT_ITEMS.map((item, index) => (
              <SuggestionItem
                key={`recent-${index}`}
                item={item}
                onSelect={onSelectSuggestion}
              />
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Trending">
            {TRENDING_ITEMS.map((item, index) => (
              <SuggestionItem
                key={`trending-${index}`}
                item={item}
                onSelect={onSelectSuggestion}
              />
            ))}
          </CommandGroup>
        </CommandList>
      </div>
    </div>
  );
};

// Active search view
const ActiveSearch = ({
  inputRef,
  value,
  onChange,
  onFocus,
  onKeyDown,
  onClear,
  onSearch,
  showSuggestions,
  onSelectSuggestion,
}: InputProps & {
  onSearch: () => void;
  showSuggestions: boolean;
  onSelectSuggestion: (value: string) => void;
}) => {
  return (
    <Command shouldFilter={false} className="overflow-visible">
      <div className="flex items-center space-x-2">
        <SearchInputField
          inputRef={inputRef}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onClear={onClear}
          isActive={true}
        />
        <Button
          onClick={onSearch}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md px-6.5 text-sm shrink-0"
          disabled={!value.trim()}
        >
          Search
        </Button>
      </div>

      {showSuggestions && (
        <SearchSuggestions
          inputValue={value}
          onSelectSuggestion={onSelectSuggestion}
        />
      )}
    </Command>
  );
};

// Main Search component
export const Search = ({ onSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to close search and suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setIsInputActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus input when active
  useEffect(() => {
    if (isInputActive) {
      inputRef.current?.focus();
    }
  }, [isInputActive]);

  // Debounced search
  useEffect(() => {
    if (!onSearch || !inputValue.trim()) return;

    clearTimeout(debounceTimeoutRef.current as NodeJS.Timeout);

    debounceTimeoutRef.current = setTimeout(() => {
      onSearch(inputValue.trim());
    }, 300);

    return () => clearTimeout(debounceTimeoutRef.current as NodeJS.Timeout);
  }, [inputValue, onSearch]);

  // Handler for immediate search (no debounce)
  const handleImmediateSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    clearTimeout(debounceTimeoutRef.current as NodeJS.Timeout);
    onSearch?.(trimmedQuery);
    setShowSuggestions(false);
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (value: string) => {
    setInputValue(value);
    handleImmediateSearch(value);
  };

  // Clear input field
  const handleClearInput = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue('');
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      handleImmediateSearch(inputValue);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsInputActive(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto">
      {!isInputActive ? (
        <SearchTrigger
          inputRef={inputRef}
          value={inputValue}
          onChange={setInputValue}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleInputKeyDown}
          onClear={handleClearInput}
          onActivate={() => setIsInputActive(true)}
        />
      ) : (
        <ActiveSearch
          inputRef={inputRef}
          value={inputValue}
          onChange={setInputValue}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleInputKeyDown}
          onClear={handleClearInput}
          onSearch={() => handleImmediateSearch(inputValue)}
          showSuggestions={showSuggestions}
          onSelectSuggestion={handleSelectSuggestion}
        />
      )}
    </div>
  );
};
