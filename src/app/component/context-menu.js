import React, {Component, PropTypes, cloneElement} from 'react';

import Portal from '../../app/component/portal';
import ContextMenuList from '../../app/component/context-menu-list';
import buildClassName from '../util/build-class-name';
import propTypes from '../util/prop-types';

export default class ContextMenu extends Component {

  static propTypes = {
    ...propTypes.component,
    menu: PropTypes.node.isRequired
  };

  state = {
    isOpen: false,
    clickOrigin: {
      x: 0,
      y: 0
    },
    isContextMenuSizeKnown: false,
    contextMenuSize: {}
  };

  handleClose = () => {
    this.setState({
      isContextMenuSizeKnown: false,
      isOpen: false
    });
  }

  handleOpen = (event) => {
    this.setState({
      isOpen: true,
      clickOrigin: {
        x: event.pageX,
        y: event.pageY
      }
    });
  }

  handleContextMenuItemClicked = (contextMenuItemOnClickHandler) => {
    return (event) => {
      this.handleClose();
      if (contextMenuItemOnClickHandler) contextMenuItemOnClickHandler(event);
    };
  }

  contextMenuDidOpen = () => {
    const size = this.menuListDOM.getBoundingClientRect();

    this.setState({
      isContextMenuSizeKnown: true,
      contextMenuSize: size
    });
  }

  render() {
    const {modifiers, classNames, children, menu} = this.props;

    const style = {
      content: {
        top: 0,
        left: 0
      }
    };

    if (this.state.isContextMenuSizeKnown) {
      const {x, y} = this.state.clickOrigin;

      const viewportHeight = global.innerHeight;
      const viewportWidth = global.innerWidth;
      const contextMenuHeight = this.state.contextMenuSize.height;
      const contextMenuWidth = this.state.contextMenuSize.width;

      // Calculate context menu position
      style.content = {
        left: (x + contextMenuWidth > viewportWidth ? viewportWidth - contextMenuWidth : x),
        top: (y + contextMenuHeight > viewportHeight ? viewportHeight - contextMenuHeight : y)
      };
    }

    // Add a an additional click handler for each context menu items
    // I assume, that all children are of type <ContextMenuItem />
    const modifiedMenu = menu.map((menuItem, index) => {
      const contextMenuItemOnClickHandler = menuItem.props.onClick;

      return cloneElement(menuItem, {
        key: index,
        onClick: this.handleContextMenuItemClicked(contextMenuItemOnClickHandler)
      });
    });

    return (
      <span
        className={buildClassName('context-menu', modifiers, classNames)}
        onClick={this.handleOpen}
      >
        <Portal
          modifiers={['context-menu']}
          style={style}
          isOpen={this.state.isOpen}
          onAfterOpen={this.contextMenuDidOpen}
          onRequestClose={this.handleClose}
        >
          <div ref={d => { this.menuListDOM = d; }}>
            <ContextMenuList>
              {modifiedMenu}
            </ContextMenuList>
          </div>
        </Portal>
        {children}
      </span>
    );
  }
}
