'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FilterIcon,
  Gamepad2,
  Search as SearchIconLucide,
  X as XIcon,
} from 'lucide-react';
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
import { RECENT_ITEMS, TRENDING_ITEMS } from '@/constants/mock-search-result';
import type { SuggestionItem } from '@/constants/mock-search-result';

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
    <div className="search-input-wrapper">
      <SearchIconLucide className="search-icon" />
      <CommandInput
        ref={inputRef}
        value={value}
        onValueChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder="Search"
        hideDefaultIcon={true}
        wrapperClassName={`${isActive ? 'w-full' : ''} border-0 p-0 h-full`}
        className={`${isActive ? '' : 'cursor-pointer'} h-full rounded-md border-0 bg-transparent pr-9 pl-9 text-sm text-zinc-100 shadow-none placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:ring-offset-0`}
      />
      {value && <XIcon className="search-clear-icon" onClick={onClear} />}
    </div>
  );
};

// Trigger view (inactive state)
const SearchSectionInactive = ({
  inputRef,
  value,
  onChange,
  onFocus,
  onKeyDown,
  onClear,
  onActivate,
}: InputProps & { onActivate: () => void }) => {
  const pathname = usePathname();
  const isExplorePage = pathname === '/explore';
  const linkHref = isExplorePage ? '' : '/explore';

  return (
    <div className="flex items-center gap-2">
      <Command
        shouldFilter={false}
        className="cursor-pointer overflow-visible"
        onClick={onActivate}
      >
        <SearchInputField
          inputRef={inputRef}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onClear={onClear}
          isActive={false}
        />
      </Command>
      <Link href={linkHref}>
        <Button>
          {isExplorePage ? <FilterIcon /> : <Gamepad2 />}
          <p>{isExplorePage ? 'Filter' : 'Explore'}</p>
        </Button>
      </Link>
    </div>
  );
};

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
      className="cursor-pointer transition-colors duration-200 hover:bg-zinc-700"
      onSelect={() => onSelect(item.text)}
    >
      {item.text}
      {item.tag && (
        <span className="ml-2 rounded-sm bg-zinc-600 px-1.5 py-0.5 text-xs text-zinc-300">
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
    <div className="search-dropdown">
      <CommandList>
        <CommandEmpty>
          {inputValue.trim() ? 'No results found.' : 'Type to search...'}
        </CommandEmpty>

        <CommandGroup
          heading={
            <div className="flex items-center justify-between">
              <span>Recent</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  alert('Clear recent clicked');
                }}
                className="h-auto px-2 py-1 text-xs"
              >
                Clear all
              </Button>
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
  );
};

// Active search view
const SearchSectionActivated = ({
  inputRef,
  value,
  onChange,
  onFocus,
  onKeyDown,
  onClear,
  onSearch, //TODO: implement search function
  showSuggestions,
  onSelectSuggestion,
}: InputProps & {
  onSearch: () => void;
  showSuggestions: boolean;
  onSelectSuggestion: (value: string) => void;
}) => {
  return (
    <Command shouldFilter={false} className="overflow-visible">
      <div className="flex items-center gap-2">
        <SearchInputField
          inputRef={inputRef}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onClear={onClear}
          isActive={true}
        />
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
// Consider splitting this component into smaller parts: SearchInput, SuggestionDropdown, SuggestionItem.
const Search = ({ onSearch }: { onSearch?: (query: string) => void }) => {
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
    <div ref={wrapperRef} className="relative mx-auto w-full max-w-xl">
      {!isInputActive ? (
        <SearchSectionInactive
          inputRef={inputRef}
          value={inputValue}
          onChange={setInputValue}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleInputKeyDown}
          onClear={handleClearInput}
          onActivate={() => setIsInputActive(true)}
        />
      ) : (
        <SearchSectionActivated
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

export default Search;
