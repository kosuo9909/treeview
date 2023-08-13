import { useState, useRef, useEffect } from 'react';

// Define nodeRefs globally or in a parent component
const nodeRefs = [];
const nestedNodeRefs = [];

const TreeNode = ({
  label,
  children,
  lengthOfTreeData,
  posinset,
  childrenLength,
  nestedIndex,
}) => {
  const [expanded, setExpanded] = useState(false);
  const ariaLabel =
    nestedIndex + 1 < childrenLength ? `Expand ${label}` : undefined;
  const nodeRef = useRef(null);
  const nestedNodeRef = useRef(null);

  // Register the current ref in the global list
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
        // event.target.firstChild.focus();
        console.log(event.target.firstElementChild);

        break;
      case 'ArrowLeft':
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
        nodeRefs[posinset - 1]?.current?.focus();
        console.log(posinset);
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
      onKeyDown={handleKeyDownParent}
    >
      {label}
      {expanded && children && (
        <ul role='group' ref={nestedNodeRef}>
          {children.map((child, index) => (
            <TreeNode
              key={index}
              {...child}
              childrenLength={children.length}
              nestedIndex={index}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeNode;
