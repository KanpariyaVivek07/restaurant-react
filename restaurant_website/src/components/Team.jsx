import React from 'react';

const Team = () => {
  return (
     <div class="team">
        <h1>Our<span>Team</span></h1>

        <div class="team_box">
            <div class="team_card">
                <div class="team_img">
                    <img src="image/team_1.jpg" alt="Chef Michael Rodriguez"/>
                </div>

                <div class="team_tag">
                    <h2>Chef Michael Rodriguez</h2>
                    <p class="job">Head Chef</p>
                    <p class="info">
                        With over 15 years of culinary experience, Chef Michael brings his
                        passion for Mediterranean cuisine to our kitchen. Trained in Italy
                        and France, he creates innovative dishes that blend traditional
                        techniques with modern flavors.
                    </p>
                </div>
            </div>

            <div class="team_card">
                <div class="team_img">
                    <img src="image/team_2.jpg" alt="Chef Sarah Chen"/>
                </div>

                <div class="team_tag">
                    <h2>Chef Sarah Chen</h2>
                    <p class="job">Pastry Chef</p>
                    <p class="info">
                        Chef Sarah specializes in creating delectable desserts and pastries
                        that are both beautiful and delicious. With a background in French
                        patisserie, she brings elegance and creativity to every sweet creation.
                    </p>
                </div>
            </div>

            <div class="team_card">
                <div class="team_img">
                    <img src="image/team_3.jpg" alt="Chef David Thompson"/>
                </div>

                <div class="team_tag">
                    <h2>Chef David Thompson</h2>
                    <p class="job">Sous Chef</p>
                    <p class="info">
                        Chef David brings his expertise in American comfort food and BBQ
                        to our kitchen. With 10 years of experience in Southern cuisine,
                        he ensures every dish is prepared with authentic flavors.
                    </p>
                </div>
            </div>

            <div class="team_card">
                <div class="team_img">
                    <img src="image/team_4.jpg" alt="Chef Maria Garcia"/>
                </div>

                <div class="team_tag">
                    <h2>Chef Maria Garcia</h2>
                    <p class="job">Line Cook</p>
                    <p class="info">
                        Chef Maria specializes in Mexican and Latin American cuisine,
                        bringing authentic flavors and traditional cooking methods to
                        our kitchen. Her expertise in spices ensures every dish bursts with flavor.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Team;