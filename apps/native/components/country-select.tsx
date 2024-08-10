import React from 'react';
import { Select, SelectProps, Adapt, Sheet } from 'tamagui';
import { useTheme, validCountries } from '../providers/theme';
import { ChevronDown } from '@tamagui/lucide-icons';

export const CountrySelect = (props: SelectProps & { handleValueChange: (newVal: string) => void }) => {
  const { setCountry } = useTheme();

  const handleChange = (newVal: string) => {
    setCountry(newVal as any);
    props.handleValueChange(newVal);  // Type assertion as Country
  };

  return (
    <Select
      value={props.value}
      onValueChange={handleChange}
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
          snapPoints={[30, 50]}
          snapPointsMode='percent'
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
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  );
};

