import { useState, useRef, useEffect } from 'react';

const nodeRefs = [];

const TreeNode = ({
  label,
  children,
  lengthOfTreeData,
  posinset,
  hasChildren,
}) => {
  const [expanded, setExpanded] = useState(false);

  const [ariaLabel, setLabel] = useState(
    hasChildren ? `Expand ${label}` : `Not expandable ${label}`
  );
  const nodeRef = useRef(null);

  useEffect(() => {
    setLabel(hasChildren ? `Expand ${label}` : `Not expandable ${label}`);
  }, [hasChildren, label]);

  useEffect(() => {
    nodeRefs[posinset] = nodeRef;
  }, [posinset]);

  const handleClick = (event) => {
    setExpanded(!expanded);
    event.stopPropagation();
  };
  useEffect(() => {
    if (expanded) {
      nodeRef.current.firstElementChild?.firstElementChild?.focus();
    }
  }, [expanded]);
  const handleKeyDownParent = (event) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        setExpanded(!expanded);
        break;
      case 'ArrowRight':
        setExpanded(true);

        break;
      case 'ArrowLeft':
        nodeRefs[posinset]?.current?.focus();
        setExpanded(false);
        break;
      case 'ArrowDown':
        if (event.target.nextElementSibling) {
          event.target.nextElementSibling.focus();
        } else {
          nodeRefs[posinset + 1]?.current?.focus();
        }
        break;
      case 'ArrowUp':
        if (event.target.previousElementSibling) {
          event.target.previousElementSibling.focus();
        } else {
          nodeRefs[posinset]?.current?.focus();
        }
        break;
      case 'Home':
        nodeRefs[0]?.current?.focus();

        break;
      case 'End':
        nodeRefs[nodeRefs.length - 1]?.current?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={nodeRef}
      role="treeitem"
      tabIndex="0"
      aria-label={ariaLabel}
      aria-selected={expanded}
      aria-posinset={posinset}
      aria-setsize={lengthOfTreeData}
      onClick={handleClick}
      onKeyDown={handleKeyDownParent}
    >
      {label}
      {expanded && children && (
        <ul role="group">
          {children.map((child, index) => (
            <TreeNode
              key={index}
              {...child}
              hasChildren={child.children ? true : false}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeNode;
