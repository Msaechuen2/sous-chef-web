import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Box,
  Divider,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Card, CardContent } from '@mui/material';

const CookingTipsPage = () => {
  const [tips, setTips] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const exampleTips = [
      // Beginner Tips
      { id: 1, title: 'Salt Your Pasta Water', description: 'It should taste like the sea for perfectly seasoned pasta.', level: 'Beginner' },
      { id: 2, title: 'Preheat Your Pan', description: 'A hot pan helps prevent sticking and ensures a good sear.', level: 'Beginner' },
      { id: 3, title: 'Read the Recipe First', description: 'Avoid surprises by reading the recipe start to finish.', level: 'Beginner' },
      { id: 4, title: 'Organize Your Workspace', description: 'Keep things clean and organized as you cook.', level: 'Beginner' },
      { id: 5, title: 'Taste as You Go', description: 'Adjust seasoning gradually for the best results.', level: 'Beginner' },
      { id: 6, title: 'Use Measuring Tools', description: 'Especially helpful when you start learning ratios.', level: 'Beginner' },

      // Intermediate Tips
      { id: 7, title: 'Let Meat Rest', description: 'Resting meat after cooking locks in the juices.', level: 'Intermediate' },
      { id: 8, title: 'Use Sharp Knives', description: 'They are safer and make cleaner cuts.', level: 'Intermediate' },
      { id: 9, title: 'Layer Flavors', description: 'Build depth by seasoning at each stage.', level: 'Intermediate' },
      { id: 10, title: 'Use a Thermometer', description: 'For perfectly cooked meats every time.', level: 'Intermediate' },
      { id: 11, title: 'Practice Mise en Place', description: 'Have everything ready before you start cooking.', level: 'Intermediate' },
      { id: 12, title: 'Know Your Pan Heat', description: 'Use medium-high for searing, low for simmering.', level: 'Intermediate' },

      // Professional Tips
      { id: 13, title: 'Don’t Overcrowd the Pan', description: 'Food will steam instead of sear.', level: 'Professional' },
      { id: 14, title: 'Deglaze with Wine', description: 'Adds depth to sauces by lifting flavorful bits from the pan.', level: 'Professional' },
      { id: 15, title: 'Control Knife Cuts', description: 'Uniform cuts cook evenly and look professional.', level: 'Professional' },
      { id: 16, title: 'Master Emulsions', description: 'Balance fat and acid in dressings and sauces.', level: 'Professional' },
      { id: 17, title: 'Work Clean and Fast', description: 'Efficiency is key in professional kitchens.', level: 'Professional' },
      { id: 18, title: 'Finish with Acid', description: 'Brightens and balances the final dish.', level: 'Professional' },
    ];
    setTips(exampleTips);
  }, []);

  const filteredTips = tips.filter(tip =>
    tip.title.toLowerCase().includes(search.toLowerCase()) ||
    tip.description.toLowerCase().includes(search.toLowerCase())
  );

  const renderSwiperSection = (level) => {
    const sectionTips = filteredTips.filter(tip => tip.level === level);
    if (sectionTips.length === 0) return null;

    return (
      <Box mb={0}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 1 }}>
          {level} Tips
        </Typography>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            600: { slidesPerView: 2 },
            960: { slidesPerView: 3 },
          }}
        >
          {sectionTips.map((tip) => (
            <SwiperSlide key={tip.id}>
              <Card sx={{ height: '180px', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {tip.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {tip.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        🍽️ Cooking Tips
      </Typography>
      <Typography variant="body1" color="textSecondary" textAlign="center" mb={4}>
        Quick tips to improve your everyday cooking skills
      </Typography>

      <Box display="flex" justifyContent="center" mb={4}>
        <TextField
          label="Search Tips"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {renderSwiperSection('Beginner')}
      <Divider sx={{ my: 4 }} />
      {renderSwiperSection('Intermediate')}
      <Divider sx={{ my: 4 }} />
      {renderSwiperSection('Professional')}
    </Container>
  );
};

export default CookingTipsPage;
