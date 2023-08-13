import { useState } from 'react';

const TreeNode = ({ label, children }) => {
  const [expanded, setExpanded] = useState('');
  return (
    <li role='treeitem' aria-selected='true' aria-expanded={expanded}>
      <div onClick={() => setExpanded(!expanded)}>{label}</div>
      {expanded && children && (
        <ul role='group'>
          {children.map((child, index) => (
            <TreeNode key={index} {...child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
