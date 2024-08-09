import React from 'react';
import { Select, getFontSize, YStack, SelectProps, Adapt, Sheet } from 'tamagui';
import { useTheme, validCountries } from '../providers/theme';
import { Check, ChevronDown } from '@tamagui/lucide-icons';

export const CountrySelect: React.FC = (props: SelectProps) => {
  const { country, setCountry } = useTheme();

  const handleCountryChange = (value: string) => {
    setCountry(value as any);  // Type assertion as Country
  };

  return (
    <Select
      value={country}
      onValueChange={handleCountryChange}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger width={'80%'} iconAfter={ChevronDown}>
        <Select.Value placeholder="Something" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>Countries</Select.Label>
            {validCountries.map((country, i) => (
              <Select.Item
                key={country.code}
                index={i}
                value={country.code}
              >
                <Select.ItemText>{country.name}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
          <YStack
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            alignItems="center"
            justifyContent="center"
            width={'$4'}
            pointerEvents="none"
          >
            <Check
              size={getFontSize('$true')}
            />
          </YStack>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  );
};

