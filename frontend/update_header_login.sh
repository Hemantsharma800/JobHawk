#!/bin/bash
FILE="src/components/Header.js"

# Add login state and button
sed -i '' '/const Header = () => {/a\
  const [isAuthenticated, setIsAuthenticated] = useState(false);\
  const navigate = useNavigate();\
\
  const handleLogin = () => {\
    navigate("/login");\
  };\
\
  const handleLogout = () => {\
    setIsAuthenticated(false);\
    navigate("/");\
  };
' "$FILE"

# Update the right side actions to show login when not authenticated
sed -i '' '/{\/\* Right Side Actions \*\/}/,/{\/\* Mobile Menu Button \*\/}/c\
          {/* Right Side Actions */}\
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>\
            {!isAuthenticated ? (\
              <Button\
                variant="contained"\
                onClick={handleLogin}\
                sx={{ mr: 1 }}\
              >\
                Sign In\
              </Button>\
            ) : (\
              <>\
                {!isMobile && (\
                  <>\
                    <Button\
                      variant="outlined"\
                      startIcon={<WorkIcon />}\
                      onClick={() => navigate("/post-job")}\
                      sx={{ mr: 1 }}\
                    >\
                      Post a Job\
                    </Button>\
                    <IconButton>\
                      <Badge badgeContent={3} color="error">\
                        <NotificationsIcon />\
                      </Badge>\
                    </IconButton>\
                  </>\
                )}\
\
                {/* User Profile */}\
                <IconButton onClick={handleMenuClick}>\
                  <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>\
                    <PersonIcon />\
                  </Avatar>\
                </IconButton>\
                <Menu\
                  anchorEl={anchorEl}\
                  open={Boolean(anchorEl)}\
                  onClose={handleMenuClose}\
                >\
                  <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>\
                    My Profile\
                  </MenuItem>\
                  <MenuItem onClick={() => { navigate("/settings"); handleMenuClose(); }}>\
                    Settings\
                  </MenuItem>\
                  <MenuItem onClick={() => { navigate("/subscription"); handleMenuClose(); }}>\
                    Subscription\
                  </MenuItem>\
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>\
                </Menu>\
              </>\
            )}\
\
            {/* Mobile Menu Button */}\
            {isMobile && isAuthenticated && (\
              <IconButton onClick={() => setDrawerOpen(true)}>\
                <MenuIcon />\
              </IconButton>\
            )}\
          </Box>
' "$FILE"

echo "Updated Header with login state"
