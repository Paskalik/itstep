import React from "react";
import "../index.css";
import Button from '@material-ui/core/Button';

export default class CustomMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        } else {
            this.props.update(event.target.id);
            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        }
    }

    render() {
        return (
            <div className="Menu">
                <Button onClick={this.showMenu}
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary">
                    &#9776;
                </Button>
                {this.state.showMenu ? (
                        <div
                            className="MenuItems"
                            ref={(element) => {
                                this.dropdownMenu = element;
                            }}
                        >
                            <button id = 'MainContent'> Главная </button>
                            <button id = 'Catalog'> Каталог </button>
                            <button id = 'Category'> Категории </button>
                            <button id = 'Store'> Места хранения </button>
                        </div>
                ) : null}
                <span>Мои продукты</span>
            </div>
        )
    }
}



