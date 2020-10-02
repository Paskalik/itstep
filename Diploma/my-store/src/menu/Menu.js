import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function CustomMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="Menu">
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                &#9776;
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={() => {props.update('MainContent'); handleClose()}} >
                    <ListItemText primary="Главная" />
                </StyledMenuItem>
                <StyledMenuItem onClick={() => {props.update('Catalog'); handleClose()}}>
                    <ListItemText primary="Каталог" />
                </StyledMenuItem>
                <StyledMenuItem onClick={() => {props.update('Category'); handleClose()}}>
                    <ListItemText primary="Категории" />
                </StyledMenuItem>
                <StyledMenuItem onClick={() => {props.update('Store'); handleClose()}}>
                    <ListItemText primary="Места хранения" />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemText primary="Тема" />
                </StyledMenuItem>
            </StyledMenu>
            <span>Мои продукты</span>
        </div>
    );
}
