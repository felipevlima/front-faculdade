import React from 'react';
import { SectionProps } from './Section.types';
import { StyledSection } from './Section.styles';

const Section = (props: SectionProps) => {
  const { children, className } = props;
  return <StyledSection className={className}>{children}</StyledSection>;
};

export default Section;
