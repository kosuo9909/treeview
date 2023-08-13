import { useState, useRef, useEffect } from 'react';

// Define nodeRefs globally or in a parent component
const nodeRefs = [];

const TreeNode = ({
  label,
  children,
  lengthOfTreeData,
  posinset,
  childrenLength,
  currentIndex,
}) => {
  const [expanded, setExpanded] = useState(false);
  const ariaLabel =
    currentIndex + 1 < childrenLength ? `Expand ${label}` : undefined;
  const nodeRef = useRef(null);

  // Register the current ref in the global list
  useEffect(() => {
    nodeRefs[posinset] = nodeRef;
  }, [posinset]);

  const handleClick = (event) => {
    setExpanded(!expanded);
    event.stopPropagation();
  };

  const handleKeyDownParent = (event) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        setExpanded(!expanded);
        event.preventDefault();
        break;
      case 'ArrowDown':
        nodeRefs[posinset + 1]?.current?.focus();
        console.log(
          `I clicked Arrowdown on ${
            nodeRefs[posinset].current
          } to focus the next one, which is ${nodeRefs[posinset + 1]}`
        );
        break;
      case 'ArrowUp':
        nodeRefs[posinset - 1]?.current?.focus();
        break;
      case 'Home':
        nodeRefs[0]?.current?.focus();
        break;
      case 'End':
        nodeRefs[posinset - 1]?.current?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={nodeRef}
      role='treeitem'
      tabIndex='0'
      aria-label={ariaLabel}
      aria-selected={expanded}
      aria-posinset={posinset}
      aria-setsize={lengthOfTreeData}
      onClick={handleClick}
      onKeyDown={handleKeyDownParent} // Enter and Space keys, Arrow keys, Home, End
    >
      {label}
      {expanded && children && (
        <ul role='group'>
          {children.map((child, index) => (
            <TreeNode
              key={index}
              {...child}
              childrenLength={children.length}
              posinset={index}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeNode;
