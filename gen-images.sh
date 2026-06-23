#!/bin/bash
OUT=/home/z/my-project/public/images
mkdir -p "$OUT"

z-ai image -p "Ultra-luxury wristwatch macro photograph, black and gold aesthetic, intricate mechanical tourbillon movement visible through skeleton dial, warm golden rim light, deep black background, cinematic dramatic lighting, fine film grain, opulent editorial luxury product photography, no text, no watermark" -o "$OUT/hero.png" -s 1344x768 > /tmp/g1.log 2>&1 &
P1=$!
z-ai image -p "Ultra-luxury wristwatch, platinum case, dial adorned with saffron orange sapphires, white diamonds and green emeralds arranged in a circular wheel pattern, Ashoka Chakra inspired filigree, deep black background, dramatic golden rim light, macro product photography, opulent, no text" -o "$OUT/tricolor.png" -s 1024x1024 > /tmp/g2.log 2>&1 &
P2=$!
z-ai image -p "Ultra-luxury wristwatch, full pave diamond case entirely covered in brilliant cut diamonds, Arabic geometric eight point star motifs cast in 18k gold on dial, deep black background, warm cinematic lighting, macro luxury product photography, opulent, no text" -o "$OUT/emirati.png" -s 1024x1024 > /tmp/g3.log 2>&1 &
P3=$!
z-ai image -p "Ultra-luxury feminine wristwatch, emerald cut diamonds and colombian green emerald inlay, sculpted elegant slender silhouette, rose gold tones, deep black background, soft cinematic lighting, macro luxury product photography, opulent, no text" -o "$OUT/signature.png" -s 1024x1024 > /tmp/g4.log 2>&1 &
P4=$!
z-ai image -p "Ultra-luxury fountain pen standing vertical, hand turned black and gold barrel, 18k gold nib, pave diamond crown, thunderbolt vajra motif engraved, deep black background, dramatic golden light, macro luxury product photography, opulent, no text" -o "$OUT/vajra.png" -s 864x1152 > /tmp/g5.log 2>&1 &
P5=$!
z-ai image -p "Master watchmaker hands setting tiny gemstones on a luxury watch dial with fine tweezers, warm focused light, dark workshop, extreme macro, cinematic, golden tones, film grain, craftsmanship, no text" -o "$OUT/atelier.png" -s 1344x768 > /tmp/g6.log 2>&1 &
P6=$!

wait $P1 $P2 $P3 $P4 $P5 $P6
echo "=== ALL DONE ==="
ls -la "$OUT"
