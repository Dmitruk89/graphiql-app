import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import type { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { switchLanguage } from '../features/translation/translationSlice';
import ruFlag from '../assets/flags/ru.png';
import enFlag from '../assets/flags/en.png';
import { getCurrentLangIndex } from '../helpers/helperFuntions';

export default function LanguageSwitcher() {
  const language = useSelector((state: RootState) => state.translation.lang);
  const languages = useSelector((state: RootState) => state.translation.supportedLangs);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(getCurrentLangIndex());

  const handleMenuItemClick = (index: number, option: string) => {
    setSelectedIndex(index);
    setOpen(false);
    dispatch(switchLanguage(option));
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup color="inherit" ref={anchorRef} aria-label="split button">
        <Button
          size="small"
          variant="text"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <div className="flag">
            {language === 'ru' ? <img src={ruFlag} alt="ru" /> : <img src={enFlag} alt="en" />}
          </div>
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {Object.keys(languages).map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItemClick(index, option)}
                    >
                      <div className="flag">
                        {option === 'ru' ? (
                          <img src={ruFlag} alt="ru" />
                        ) : (
                          <img src={enFlag} alt="en" />
                        )}
                      </div>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
