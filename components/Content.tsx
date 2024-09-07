import { styled } from "@mui/material/styles";

const StyledContent = styled('div')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightRegular,
}));

const StyledTitle = styled('h1')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
}));

const Content: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <StyledContent>
      <StyledTitle>{title}</StyledTitle>
      <div>{children}</div>
    </StyledContent>
  );
};

export default Content;
