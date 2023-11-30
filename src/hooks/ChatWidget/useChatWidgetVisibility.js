import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useChatWidgetVisibility = () => {
  const location = useLocation();
  const [chatWidgetVisible, setChatWidgetVisible] = useState(false);

  useEffect(() => {
    const toDisplayPaths = ['/', '/Marketplace', '/Services', '/ShopCart']
    setChatWidgetVisible(toDisplayPaths.includes(location.pathname));
  }, [location.pathname]);

  return chatWidgetVisible;
};

export default useChatWidgetVisibility;